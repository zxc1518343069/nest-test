import { registerAs } from '@nestjs/config';
// https://docs.nestjs.com/techniques/configuration#configuration-namespaces
export default registerAs('coffees', () => ({
  foo: 'bar',
}));
