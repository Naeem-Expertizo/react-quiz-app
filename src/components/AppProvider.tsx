"use client";
import { store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'

const AppProvider = ({children}: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default AppProvider
