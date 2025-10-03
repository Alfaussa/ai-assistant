 
import BoilerCalculator from '../components/BoilerCalculator';
import Chat from '../components/Chat';


export const metadata = {
  title: 'My page title',
  description: 'My page description',
}
export default function Home() 
{ return <> 
     
        <title>AI Помощник</title>
        
         
         <main> <Chat /> 
         <BoilerCalculator/>
         </main>
          </> ; 

         }
