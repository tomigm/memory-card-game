import logo from './assets/images/Pantone_logo.svg';
import './assets/stylesheets/index.css';
import Cards from './components/cards.js';
import  React  from 'react';

import modal_2010 from './assets/images/2010_modal.png';
import modal_2011 from './assets/images/2011_modal.png';
import modal_2013 from './assets/images/2013_modal.png';
import modal_2012 from './assets/images/2012_modal.png';
import modal_2014 from './assets/images/2014_modal.png';
import modal_2015 from './assets/images/2015_modal.png';
import modal_2016 from './assets/images/2016_modal.png';
import modal_2017 from './assets/images/2017_modal.png';
import modal_2018 from './assets/images/2018_modal.png';
import modal_2019 from './assets/images/2019_modal.png';
import modal_2020 from './assets/images/2020_modal.png';



class App extends React.Component {


constructor(props) {
  super(props)

  this.state = {
    counter: 0,
    highScore: 0,
    cardData: [
      {color:'#45B8AC', code:'15-5519', name:'Turquoise', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2010', modalImg:modal_2010},
      {color:'#D65076', code:'18-2120', name:'Honeysuckle', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2011', modalImg:modal_2011},
      {color:'#DD4124', code:'17-1463', name:'Tangerine Tango', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2012', modalImg:modal_2012},
      {color:'#009874', code:'17-5641', name:'Emerald', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2013', modalImg:modal_2013},
      {color:'#AD5E99', code:'18-3224', name:'Radiant Orchid', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2014', modalImg:modal_2014},
      {color:'#964F4C', code:'18-1438', name:'Marsala', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2015', modalImg:modal_2015},
      {color:'#93A9D1', code:'15-3919', name:'Serenity', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2016', modalImg:modal_2016},
      {color:'#88B04B', code:'15-0343', name:'Greenery', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2017', modalImg:modal_2017},
      {color:'#5F4B8B', code:'18-3838', name:'Ultra Violet', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2018', modalImg:modal_2018},
      {color:'#FF6F61', code:'16-1546', name:'Living Coral', link:'https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2019', modalImg:modal_2019}
  ],
    clickedMemory: [],
    winScreen: false,
    showModal: 'none',
    modalContent: '',
  }
  this.handleSelection = this.handleSelection.bind(this);
  this.openModal = this.openModal.bind(this)
}
  gameFlow = () => {
    const { counter, highScore, cardData, winScreen } = this.state;

    console.log('corre');
    if (counter === 10) {
      this.setState({
        winScreen: !winScreen
      })
    }
    else {
      return
    }
  }
  
  handleSelection(name) {
    console.log(name);
    const {clickedMemory, counter, highScore} = this.state;
    const values = [...clickedMemory];
    let check = values.some(item => item === name)
    console.log(check)
    if(!check){
      
      this.setState({
        clickedMemory: clickedMemory.concat(name),
        counter: counter+1,
        
      })
      
    }

    else {
      this.setState({
        clickedMemory: [],
        counter: 0
      })

      this.gameFlow() 
    }

  }

  renderOnWin() {
    return (
      <div className="winScreen">
        <div className="winScreen_image"></div>
               
          <div className="winScreen_btn_group">          
            <button className="btn white">REPLAY</button>
            <a className="btn black" href="https://www.pantone.com/color-intelligence/color-of-the-year/color-of-the-year-2020">MORE INFO</a>
          </div>
        

      </div>
    )
  }

  openModal = (event, modalImg, link) => {

    event.stopPropagation();

    this.setState({
      showModal: 'flex',
      modalContent: {img: modalImg, link: link},
    })
  }

  closeModal = () => {
    this.setState({
      showModal: 'none',
    })
  }

  render() {
   const { counter, highScore, cardData, winScreen, showModal, modalContent } = this.state;

  return (
    <div className="App">
      <header>
        <div className="main_header">
          <img src={logo} alt="pantone main logo" className="main_header__logo"/>
          <h1>A DECADE IN COLORS</h1>
          <a id="counter">Points: { counter }</a>
        </div>
        <div className="sub_header">
          <h2 className="sub_header__title">Discover & play! - Get points by clicking on each color but don't click on any more than once!</h2>
          <a id="highScore">High Score: { highScore }</a>

        </div>     
        
      </header>
      <div className="section_wrapper">
        {
        (winScreen) ?
        this.renderOnWin()
        :
        <div>
        <Cards cardData = {cardData}  _handleSelection={this.handleSelection.bind(this)} _openModal = {this.openModal.bind(this)} />
        <div style={{display: `${showModal}`}} className="colorModal" onClick={this.closeModal} > 
          
          <div style={{backgroundImage: `url(${modalContent.img})`}} alt="modal image" className="modal_image"> </div>
          <a className="btn white" href={modalContent.link} onClick={(e) => e.stopPropagation()} target="_blank"> MORE INFO </a> 
          
        </div>
       </div>
        }

      </div>
    </div>
  );
  }
}

export default App;
