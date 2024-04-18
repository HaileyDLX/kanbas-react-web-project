function TernaryOperator(){
    let loggedIn = true;

    return(
        <div>
            <h4>Logged In</h4>
            { loggedIn ? <p>Welcome</p> : <p>Please login</p> }
        </div>
    );

}
export default TernaryOperator;