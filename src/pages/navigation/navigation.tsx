import { navigateConfig } from './navigation.constants'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

import './navigation.scss'

export const Navigation = () => {
  const navigate = useNavigate()

  return (
    <section className="navigation">
      <h1>Добро пожаловать!</h1>
      <p className="navigation__description">
        Это приложение демонстрирует две карты: интерактивную с
        возможностью увидеть детальную информацию о стране и обычную
        топографическую.
      </p>

      <nav className="navigation__list">
        {navigateConfig.map((page) => (
          <Button
            key={page.title}
            variant="contained"
            className="navigation__button"
            href={page.href}
            onClick={() => {
              navigate(page.navigate)
            }}
          >
            {page.title}
          </Button>
        ))}
      </nav>
    </section>
  )
}
