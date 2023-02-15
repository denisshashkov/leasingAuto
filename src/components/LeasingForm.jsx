import React, { useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { RangeInput } from '../UI/RangeInput';

export const LeasingForm = () => {
  const minCost = 1500000;
  const maxCost = 10000000;
  const minPeriod = 6;
  const maxPeriod = 120;

  const [costTextValue, setCostTextValue] = useState(minCost);
  const [periodTextValue, setPeriodTextValue] = useState(minPeriod);
  const [disabledButton, setDisabledButton] = useState(false);

  const firstMinPayment = (costTextValue / 100) * 10;
  const firstMaxPayment = (costTextValue / 100) * 60;

  const [percentTextValue, setPercentTextValue] = useState(0);

  const percent = Math.round((percentTextValue / costTextValue) * 100);

  //Ежемесячный платеж
  const monthPayment = Math.round(
    (costTextValue - percentTextValue) *
      ((0.05 * Math.pow(1 + 0.05, periodTextValue)) /
        (Math.pow(1 + 0.05, periodTextValue) - 1))
  );

  //Сумма договора лизинга
  const amount = periodTextValue * monthPayment;

  //Обработка инпута стоимости автомобиля
  const handleCostTextChange = (e) => {
    setCostTextValue(e.target.value);
  };

  //Проверка на минимальное и максимальное значение стоимости автомобиля
  const handleMinMaxCostValue = (e) => {
    if (e.target.value < minCost) {
      setCostTextValue(minCost);
    } else if (e.target.value > maxCost) {
      setCostTextValue(maxCost);
    }
  };

  //Обработка инпута первоначальный взнос
  const handleFirstPaymentTextChange = (e) => {
    setPercentTextValue(e.target.value);
  };

  //Проверка на минимальное и максимальное значение первоначального взноса
  const handleMinMaxFirstPaymentValue = (e) => {
    if (e.target.value < firstMinPayment) {
      setPercentTextValue(firstMinPayment);
    } else if (e.target.value > firstMaxPayment) {
      setPercentTextValue(firstMaxPayment);
    }
  };

  //Обработка инпута срока лизинга
  const handlePeriodTextChange = (e) => {
    setPeriodTextValue(e.target.value);
  };

  //Проверка на минимальное и максимальное значение срока лизинга
  const handleMinMaxPeriodValue = (e) => {
    if (e.target.value < minPeriod) {
      setPeriodTextValue(minPeriod);
    } else if (e.target.value > maxPeriod) {
      setPeriodTextValue(maxPeriod);
    }
  };

  //закидываем значения из state в объект data для отправки
  const data = {
    cost: costTextValue,
    payment: percentTextValue,
    period: periodTextValue,
    amount: amount,
    monthPayment: monthPayment,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabledButton(true);
    const res = JSON.stringify(data);
    alert(res);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form__inputs'>
        <div className='form__item'>
          <Input
            className='form__input'
            label='стоимость автомобиля'
            type='number'
            onChange={handleCostTextChange}
            onBlur={handleMinMaxCostValue}
            id='cost'
            value={costTextValue}
          >
            <span>₽</span>
          </Input>
          <RangeInput
            min={minCost}
            max={maxCost}
            value={costTextValue}
            onChange={handleCostTextChange}
          />
        </div>
        <div className='form__item'>
          <Input
            className='form__input'
            label='Первоначальный взнос'
            type='number'
            onChange={handleFirstPaymentTextChange}
            onBlur={handleMinMaxFirstPaymentValue}
            id='payment'
            value={percentTextValue}
          >
            <div className='form__input--percent'>
              <span>{`${percent}%`}</span>
            </div>
          </Input>
          <RangeInput
            min={firstMinPayment}
            max={firstMaxPayment}
            value={percentTextValue}
            onChange={handleFirstPaymentTextChange}
          />
        </div>

        <div className='form__item'>
          <Input
            className='form__input'
            label='Срок лизинга'
            type='number'
            id='period'
            value={periodTextValue}
            onChange={handlePeriodTextChange}
            onBlur={handleMinMaxPeriodValue}
          >
            <span>мес.</span>
          </Input>
          <RangeInput
            min={minPeriod}
            max={maxPeriod}
            value={periodTextValue}
            onChange={handlePeriodTextChange}
          />
        </div>
      </div>
      <div className='form__total'>
        <div className='form__item form__item--total'>
          <Input
            className='form__input form__input--total'
            label='Сумма договора лизинга'
            readOnly
            total
            type='text'
            value={`${amount} ₽`}
          ></Input>
        </div>

        <div className='form__item form__item--total'>
          <Input
            className='form__input form__input--total'
            label='Ежемесячный платеж от'
            readOnly
            total
            type='text'
            value={`${monthPayment} ₽`}
          ></Input>
        </div>

        <div className='form__item buttonWrapper'>
          <Button disabled={disabledButton} type='submit'>
            Оставить заявку
          </Button>
        </div>
      </div>
    </form>
  );
};
