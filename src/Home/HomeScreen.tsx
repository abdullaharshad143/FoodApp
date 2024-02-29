import { Text } from "react-native"
import { useEffect } from "react"

const HomeScreen = () => {
    useEffect (()=> {
        console.log("Inside Home Screen")
    }, [])
    return(
        <Text>
            Home Screeen
        </Text>
    )
}

export default HomeScreen