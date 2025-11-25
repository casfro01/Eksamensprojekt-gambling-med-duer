import {Suspense} from "react";
import {UserProfile} from "./UserProfile.tsx";

export const UserProfilePage = () => {
    return (
        <Suspense fallback={<p>Henter bruger data.</p>}>
            <UserProfile></UserProfile>
        </Suspense>
    );
}