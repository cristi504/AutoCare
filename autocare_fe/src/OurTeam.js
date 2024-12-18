import React from "react";
import UserCard from "./UserCard";

function OurTeam(){


  const users = [
    {
      nume :"User 1",
      varsta:20,
      bio:"About user 1"
    },
    {
      nume :"User 2",
      varsta:20,
      bio:"About user 2"
    },
    {
      nume :"User 3",
      varsta:20,
      bio:"About user 3"
    },
    {
      nume :"User 4",
      varsta:20,
      bio:"About user 4"
    }
  ];

  return (
    <div className="App">
      <usercard nume= {"User1"} varsta ={"10"} bio ={"About me"}> </usercard>
      <div>
        {users.map(
          user=> (<usercard nume={user.nume} vartsa = {user.varsta} bio = {user.bio}></usercard>)
        )}
      </div>
    </div>
  );
}
export default OurTeam;