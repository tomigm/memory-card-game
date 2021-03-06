import React from 'react';
import logo from '../assets/images/Pantone_logo.svg';


class Cards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
            isOpen: false,
        }
    }

    cardSort = (array) => {
        array.sort(() => Math.random() - 0.5);
        return array
    }
// Every time the counter adds +1, the cards are sorted
    componentDidUpdate(prevProps) {
        if (this.props.counter !== prevProps.counter ){
          this.props._gameFlow();
          const cardsSorted = this.cardSort(this.props.cardData);
          this.setState({
            cardData: cardsSorted
          })
        }
      }
// First time that cards are mounted; they are sorted after mounted
    componentDidMount() {
        const  cardData  = this.props.cardData;
        const cardsSorted = this.cardSort(cardData)
        this.setState({
            cardData: cardsSorted
        })        
    }

    cardGen = () => {
        const cardData = this.props.cardData        
        return cardData.map(card =>  (
            <div className="card" name={card.name} onClick={(event) => this.props._handleSelection(card.name, event)}>
                <div className="card__colorBox"  style={{backgroundColor: `${card.color}`}} >
                    <div className="plus_icon" name={card.name} onClick={(event) => this.props._openModal(event, card.modalImg, card.link) }>+</div>
                </div>
                <div className="card__description">
                    <img src={logo} alt="pantone card logo" className="description__logo" />
                    <p>{card.code}</p>
                    <p>{card.name}</p>
                </div>                
            </div>
        ))
    }

    render() {        
        return (
            <div className="card_container">
            {this.cardGen()}
            </div>
        )
    }
}

export default Cards