const formatValue = (value: number): string =>
  Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value);

export default formatValue;
