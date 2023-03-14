import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {constructAuthorizationUrl, parseHashParamsFromUrl} from "../utilities/helpers";
import {LoginBox} from "../material/LoginBox";


const Home: NextPage = () => {

    const router = useRouter();

    const authenticate = () => {
        router.push(constructAuthorizationUrl());
    }

    if(router.asPath.includes('access_token')) {
        localStorage.setItem('accessToken', parseHashParamsFromUrl(router.asPath).accessToken);
        router.push('/main');
    }

    return (
       <LoginBox authenticate={authenticate}/>
    )
}

export default Home
