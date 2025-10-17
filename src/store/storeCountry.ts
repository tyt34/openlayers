import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import type { CountryResponse } from '../types/country-response'

class CountryStore {
  countryData: CountryResponse | null = null
  loading = false

  private cache: Record<string, CountryResponse> = {}

  constructor() {
    makeAutoObservable(this)
  }

  async fetchCountry(countryName: string) {
    const cached = this.cache[countryName.toLowerCase()]

    if (cached) {
      this.countryData = cached
      this.loading = false
      return
    }

    this.loading = true
    this.countryData = null

    try {
      const response = await axios.get<CountryResponse[]>(
        `https://restcountries.com/v3.1/name/${countryName}`,
        { params: { fullText: true }, timeout: 5000 },
      )

      const data = response.data[0]

      this.countryData = data
      this.cache[countryName.toLowerCase()] = data
    } catch (e) {
      console.error(e)
      this.countryData = null
    } finally {
      this.loading = false
    }
  }

  clearCountry() {
    this.countryData = null
  }
}

export const countryStore = new CountryStore()
