import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class MaxCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first: '',
          second: '',
          third: '',
          maxValue: '',
          description: '',
          results: []
         };
      }

    calculateMax = () => {
      axios
        .get(`api/max/${this.state.first},${this.state.second},${this.state.third}`)
        .then((response) => {
          console.log(response.data);
          this.setState({
            maxValue: response.data.maxValue,
            description: response.data.description
          })
        });
     }

     getResults = () => {
       axios
         .get('api/results')
         .then((response) => {
         console.log(response.data);
         this.setState({
           results: response.data
         })
       });
     }

     first = (e) => {
       this.setState({ first: e.target.value });
     }

     second = (e) => {
       this.setState({ second: e.target.value });
     }

     third = (e) => {
       this.setState({ third: e.target.value });
     }

     render() {
       return (

         <div className="App">
           <header>
             <div className="name">
               <h1>Kalkulator maksymalnej wartości</h1>
               <p className="position-title">Lucyna Powałowska</p>
             </div>
           </header>
           <hr />
           <main>
             <section className="main-content">
               <h2>Witaj!</h2>
               <article>
                 <div className="introduction-content">
                   <div className="introduction">
                     <h2>Wprowadź trzy liczby, aby otrzymać maksymalną wartość</h2>
                   </div>
                 </div>
               </article>
             </section>
             <section className="main-container">
               <div className="container">
                 <article className="containers">
                   <form>
                     <input className="input-number" type="number" placeholder="Wpisz pierwszą liczbę" name="first" value={this.state.first} onChange={this.first} />
                     <input className="input-number" type="number" placeholder="Wpisz drugą liczbę" name="second" value={this.state.second} onChange={this.second} />
                     <input className="input-number" type="number" placeholder="Wpisz trzecią liczbę" name="third" value={this.state.third} onChange={this.third} />
                     <button className="btn btn-calc" type="button" onClick={this.calculateMax}>Oblicz</button>
                   </form>
                 </article>
                 <article className="containers">
                   <form>
                     <h2>Twoje maksimum</h2>
                     <div className="item-result item-bold">{this.state.maxValue}</div>
                     <div className="item-result">{this.state.description}</div>
                   </form>
                 </article>
               </div>
               <form>
                 <button className="btn" type="button" onClick={this.getResults}>Sprawdź wszystkie wyniki</button>
                 <div className="item-results-container">
                   {this.state.results.map((result, x) =>
                     <div className="item-result" key={x}>{`${result["number"]}`}</div>
                   )}
                 </div>
               </form>
              </section>
            </main>
          </div>
    );
  }
}

export default MaxCalculator
