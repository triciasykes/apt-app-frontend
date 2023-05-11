import { render, screen } from '@testing-library/react';
import ApartmentShow from '../pages/ApartmentShow';
import { MemoryRouter, Routes, Route } from "react-router-dom"
import apartments from '../mockApartments'

const renderShow = () => {
  render(
    <MemoryRouter initialEntries={["/apartmentshow/1"]}>
      <Routes>
        <Route path="/apartmentshow/:id" element={<ApartmentShow apartments={apartments} />} />
      </Routes>
    </MemoryRouter>
  )
}

describe("<ApartmentShow />", () => {
  it("renders apartment price attribute", () => {
    renderShow()
    const price = screen.getByText(/\$2000\/month/i)    
    expect(price).toBeInTheDocument()
  
  })
})