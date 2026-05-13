import {
  createContext,
  useContext
} from 'react'

const TenantContext = createContext<any>(null)

export const TenantProvider = ({
  children
}: any) => {

  const tenantId =
    localStorage.getItem('tenantId')

  return (
    <TenantContext.Provider
      value={{ tenantId }}
    >
      {children}
    </TenantContext.Provider>
  )
}

export const useTenant = () =>
  useContext(TenantContext)