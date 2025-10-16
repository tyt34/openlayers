import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import './header.style.scss'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <div className="header">
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/navigation')}
        className="header__button"
      >
        Главная
      </Button>
    </div>
  )
}
