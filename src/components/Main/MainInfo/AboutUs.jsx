import './aboutUs.css';
import { Card, Col, Row } from 'antd';

const AboutUs = () => {
  return (
    <div>
    <section className='section-main-info'>
           <div class="about-cards-list">
  
  <div class="about-card 1">
    <div class="about-card_image" style={{backgroundColor:'#222745'}}> </div>
    <div class="about-card_title title-white">
      <p>Card Title</p>
      <p>"Lorem ipsum dolor sit amet"</p>
    </div>
  </div>
  
    <div class="about-card 2">
    <div class="about-card_image" style={{backgroundColor:"#ffa1a2"}}>
      </div>
    <div class="about-card_title title-white">
      <p>Card Title</p>
      <p>"Lorem ipsum dolor sit amet"</p>
    </div>
  </div>
  <div class="about-card 3">
    <div class="about-card_image" style={{backgroundColor:'#222745'}}>
      </div>
    <div class="about-card_title title-white">
      <p>Card Title</p>
      <p>"Lorem ipsum dolor sit amet"</p>
    </div>
  </div>
    </div>
    </section>
    </div>
  );
}
 
export default AboutUs;
