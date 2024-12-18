import React from "react";

function UserCard({nume,varsta, bio}){
    return (
        <div>
            <h3>
                {nume}
            </h3>
            <p>
                Age: {varsta}
            </p>
            <p>
                Bio: {bio}
            </p>
        </div>
    )
}

export default UserCard;