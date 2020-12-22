import React, { useCallback, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderContent,
  Content,
  Search,
  Section,
  Product,
  Price,
} from './styles';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/lider-logo.svg';

import formatValue from '../../utils/formatValue';

interface SearchFormData {
  search: string;
}

interface ProductDTO {
  percentOfDiscount: number;
  _id: string;
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  priceWithDiscount: number;
  percentOfDiscountFormatted: string;
  priceFormatted: string;
  priceWithDiscountFormatted: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [search, setSearch] = useState<string>('');

  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      try {
        formRef.current?.setErrors({});

        if (data.search.length > 0 && data.search.length <= 3) {
          await api
            .get<ProductDTO>(`/products/${data.search}`)
            .then(response => {
              // eslint-disable-next-line no-shadow

              const productsFormatted = {
                ...response.data,
                percentOfDiscountFormatted: `${(
                  response.data.percentOfDiscount * 100
                ).toString()}%`,
                priceFormatted: formatValue(response.data.price),
                priceWithDiscountFormatted: formatValue(
                  response.data.priceWithDiscount,
                ),
              };
              setProducts([productsFormatted]);
              setSearch(data.search);
            });
        } else {
          await api
            .get<ProductDTO[]>('/products', {
              params: {
                search: data.search,
              },
            })
            .then(response => {
              // eslint-disable-next-line no-shadow
              const productsFormatted = response.data.map(prod => ({
                ...prod,
                percentOfDiscountFormatted: `${(
                  prod.percentOfDiscount * 100
                ).toString()}%`,
                priceFormatted: formatValue(prod.price),
                priceWithDiscountFormatted: formatValue(prod.priceWithDiscount),
              }));
              setProducts(productsFormatted);
              setSearch(data.search);
            });
        }

        // history.push('/');
      } catch (err) {
        console.log(err);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          // return;
        }

        // it triggers a toast
        addToast({
          type: 'error',
          title: 'Register Error',
          description: 'It happened an error to search products, try again',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Líder" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              type="text"
              icon={FiSearch}
              name="search"
              placeholder="¿Qué estás buscando?"
            />
          </Form>
        </HeaderContent>
      </Header>
      <Content>
        <Search>
          <p>
            {search.length > 0 && (
              <div>
                <span>Resultado para: </span>
                <b>{search}</b>
              </div>
            )}
          </p>
        </Search>

        <Section>
          {products.map(prod => (
            <Product key={prod.id}>
              <div>
                <img
                  // src="https://avatars1.githubusercontent.com/u/18425787?s=460&u=692e0e711e5fe60188a1518cc9a2f7bae3bd6624&v=4"
                  src={`http://${prod.image}`}
                  alt={prod.brand}
                />
              </div>
              <div>
                <div>
                  <b>{prod.brand}</b>
                  <span> {prod.description}</span>
                </div>
                <Price>
                  <span>{prod.priceWithDiscountFormatted}</span>
                  {prod.percentOfDiscount > 0 && (
                    <strong>{prod.percentOfDiscountFormatted}</strong>
                  )}
                  <p>
                    {prod.percentOfDiscount > 0 && <s>{prod.priceFormatted}</s>}
                  </p>
                </Price>
              </div>
            </Product>
          ))}
        </Section>
      </Content>
    </Container>
  );
};

export default Dashboard;
