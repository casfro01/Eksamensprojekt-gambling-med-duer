import {useLoginInformation} from "./useLogin.ts";

export const UserGreeting = () => {
    const {
        Jwt,
        fullName
    } = useLoginInformation();
    try{
        return (
            <p className="game-subtitle">
                {Jwt == null ? "Login for at spille." : "Velkommen: " + fullName}
            </p>
        );
    }
    catch(err){
        console.log(err);
        return <p className="game-subtitle">
            {"Login for at spille."}
        </p>
    }
};