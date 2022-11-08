import { CtxOrReq } from "next-auth/client/_utils"
import { getCsrfToken, getProviders, signIn, useSession } from "next-auth/react"



export default function signin({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}



export async function getServerSideProps(context: CtxOrReq | undefined) {
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    return {
      props: {
        providers,
        csrfToken
      },
    }
  }