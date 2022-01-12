import {useState, useCallback, useEffect} from "react"



export const useAuth = () => {

	
	const [token, setToken] = useState(null)
	const [ready, setReady] = useState(false)


	const login = useCallback((jwtToken) => {
		setToken(jwtToken)
		
		localStorage.setItem('userData', JSON.stringify({
			token: jwtToken
		}))

		

	}, [])


	const logout = useCallback(() => {
		setToken(null)
		localStorage.removeItem('userData')
		

	}, [])

	useEffect(() => {

		const data = JSON.parse(localStorage.getItem('userData'))

		if(data && data.token){
			login(data.token, data.userId)
		}
		setReady(true)

	}, [login])


	return {logout, login, token, ready}
}