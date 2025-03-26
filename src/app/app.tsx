import { TodosPage } from '@/pages/todos';
import { BaseLayout } from './layout/base-layout';
import { Footer } from '@/widgets/footer';

const App = () => {
    return <BaseLayout main={<TodosPage />} footer={<Footer />} />;
};

export default App;
