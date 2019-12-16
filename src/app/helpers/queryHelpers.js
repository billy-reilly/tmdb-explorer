export const getQueryParameter = (searchString, parameterName) => {
  const bothArgsAreStrings =
    searchString &&
    typeof searchString === 'string' &&
    parameterName &&
    typeof parameterName === 'string';

  if (!bothArgsAreStrings) return undefined;

  const searchStringIsOfExpectedShape = /^\?/.test(searchString);

  if (!searchStringIsOfExpectedShape) return undefined;

  const keyValuePairs = searchString
    .replace(/^\?/, '')
    .split('&')
    .filter(pairString => pairString.indexOf('=') >= 0)
    .map(pairString => pairString.split('='));

  const keyValuePairWithCorrectKey = keyValuePairs.find(
    pair => pair[0] === parameterName
  );

  if (!keyValuePairWithCorrectKey) return undefined;

  if (keyValuePairWithCorrectKey.length === 2) {
    return keyValuePairWithCorrectKey[1];
  }

  // handle the case where the value has '=' in it eg '?q=james=bond':
  const [, ...rest] = keyValuePairWithCorrectKey;
  return rest.join('=');
};
