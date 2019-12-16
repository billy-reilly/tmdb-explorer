import { getQueryParameter } from './queryHelpers';

describe('#getQueryParameter', () => {
  it('should return undefined when the searchString arg is undefined', () => {
    expect(getQueryParameter(undefined, 'param')).toBe(undefined);
  });

  it('should return undefined when the search string is empty', () => {
    expect(getQueryParameter('', 'param')).toBe(undefined);
  });

  it('should return undefined when the parameterName is undefined', () => {
    expect(getQueryParameter('?param=some_value', undefined)).toBe(undefined);
  });

  it('should return undefined when the parameterName is empty', () => {
    expect(getQueryParameter('?param=some_value', '')).toBe(undefined);
  });

  it('should return undefined when the search string does not begin with a ?', () => {
    expect(getQueryParameter('definitely not a search string', 'param')).toBe(
      undefined
    );
  });

  it('should return undefined when the search string is valid but does not contain the param requested', () => {
    expect(getQueryParameter('?paraymmm=nuhuh', 'param')).toBe(undefined);
  });

  it('should return the query param value if it is the only query param in the string', () => {
    expect(getQueryParameter('?param=some_value', 'param')).toBe('some_value');
  });

  it('should return the query param value if it is one of the query params in the string', () => {
    expect(getQueryParameter('?paraymmm=nuhuh&param=some_value', 'param')).toBe(
      'some_value'
    );
  });

  it('should handle the case where the param value has an equals sign in it', () => {
    expect(getQueryParameter('?param=some=value&something=else', 'param')).toBe(
      'some=value'
    );
  });
});
