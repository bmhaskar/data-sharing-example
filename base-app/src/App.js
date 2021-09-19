import './App.css';
import {Provider}  from "./Provider";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Example} from "./Example";


 export default function App() {
   return (
     <Provider>
       <Router>
           <Switch>
               <Route path="/" children={
                   <Example />
               } />
           </Switch>
       </Router>
     </Provider>
   )
 }
 
