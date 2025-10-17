import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from '@mui/material'
import type { CountryResponse } from '../../types/country-response'
import type { FC } from 'react'

import './dialog-country.style.scss'

interface Props {
  open: boolean
  loading: boolean
  countryData: CountryResponse | null
  onClose: () => void
}

export const DialogCountry: FC<Props> = ({
  open,
  loading,
  countryData,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {countryData?.name?.common || 'Неизвестная страна'}
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <div className="center-column">
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Загружается информация...
            </Typography>
            <LinearProgress sx={{ width: '100%', borderRadius: 1 }} />
          </div>
        ) : countryData ? (
          <>
            <Typography>
              Столица: {countryData.capital?.[0] || '—'}
            </Typography>
            <Typography>
              Население:{' '}
              {countryData.population?.toLocaleString() || '—'}
            </Typography>
            <Typography>
              Валюта:{' '}
              {countryData.currencies
                ? Object.keys(countryData.currencies).join(', ')
                : '—'}
            </Typography>
            <Typography>Регион: {countryData.region || '—'}</Typography>
          </>
        ) : (
          <Typography>Нет данных</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}
