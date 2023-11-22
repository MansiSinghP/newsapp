import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import { propTypes } from 'react-bootstrap/esm/Image';


export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    country: 'in',
    category: 'general'
  }
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }


  constructor(){
    super();
    console.log("Hello I am a constructor from news component")
    this.state={
      articles:[],
      loading: false,
      page:1
    }
  }
  async updateNews(){
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d935ab7669804cc6b2e2ea29a7929f36&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url)
    this.props.setProgress(30)
    let parsedData=await data.json();
    console.log(parsedData)
    this.setState({articles : parsedData.articles,totalResults : parsedData.totalResults,
    loading:false })
this.props.setProgress(100)
  }
  async componentDidMount(){
    this.setState({
      page:1
    })
   this.updateNews();
  }

  handlePrev=async()=>{
    console.log("previous is clicked!");
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d935ab7669804cc6b2e2ea29a7929f36&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url)
    this.props.setProgress(30)
    let parsedData=await data.json();
    console.log(parsedData)
    this.setState({articles : parsedData.articles,totalResults : parsedData.totalResults,
    loading:false })
this.props.setProgress(100)
    this.setState({
      page:this.state.page - 1,
      
       })
   

  }
  handleNext=async()=>{
    console.log("next is clicked!");
    if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
    this.props.setProgress(0);
    /* Loaded url is also page+1, then state variable is also updated as page+1 */
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d935ab7669804cc6b2e2ea29a7929f36&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url)
    this.props.setProgress(30)
    let parsedData=await data.json();
    console.log(parsedData)
    this.setState({articles : parsedData.articles,totalResults : parsedData.totalResults,
    loading:false })
this.props.setProgress(100)
this.setState({
  page:this.state.page +1,
  
   })

}
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'55px 45px 0 0'}}>NewsMonkey - Top HeadLines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {this.state.articles.map((element)=>{
              return  <div key={element.url} className='col-md-4'>
                <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage}
              newsUrl={element.url} publishedAt={element.publishedAt} />
               </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrev}> &larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-2" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News