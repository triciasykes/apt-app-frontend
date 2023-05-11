import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';

describe("<Header />", () => {
  it("renders without crashing", () => {
    <BrowserRouter>
      <Header />
    </BrowserRouter>
    
  })
})