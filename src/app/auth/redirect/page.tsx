import LoadingView from "@/views/LoadingView/LoadingView";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function Loading() {

    return (
        <UserProvider>
            <LoadingView/>
        </UserProvider>
    );
}