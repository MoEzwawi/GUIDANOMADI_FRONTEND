export const LOGOUT = 'LOGOUT'

export const logoutAction = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
    window.location.reload()
}