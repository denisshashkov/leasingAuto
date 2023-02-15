import { LeasingForm } from './components/LeasingForm';

export const App = () => {
  return (
    <div className='container'>
      <div className='leasing'>
        <h1 className='leasing__title'>
          Рассчитайте стоимость <br /> автомобиля в лизинг
        </h1>
        <LeasingForm />
      </div>
    </div>
  );
};
