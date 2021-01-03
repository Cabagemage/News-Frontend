import createContext from 'create-react-context';

export { ThemeProvider } from './ThemeProvider';
export { ThemeConsumer } from './ThemeConsumer';

const { Provider, Consumer } = createContext();

export { Provider, Consumer };