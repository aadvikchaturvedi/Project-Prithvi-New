export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.email === email && u.password === password)
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      name: user.name
    }))
    return { success: true, user }
  }
  return { success: false, message: 'Invalid credentials' }
}

export const signup = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email already exists' }
  }
  
  const newUser = { name, email, password }
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('currentUser', JSON.stringify({
    email: newUser.email,
    name: newUser.name
  }))
  
  return { success: true, user: newUser }
}

export const logout = () => {
  localStorage.removeItem('currentUser')
}

export const isAuthenticated = () => {
  return localStorage.getItem('currentUser') !== null
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}
