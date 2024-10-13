import CountdownTimer from '../components/countdown';

export default function Home() {


  // Time should be passed in this format : YYYY-MM-DDTHH:MM:SS
  
  return (
    <div>
      <h3>Event Countdown</h3>
  
      <CountdownTimer targetTime="2024-12-31T00:00:00" />
    </div>
  );
}
