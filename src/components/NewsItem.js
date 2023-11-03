import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description, imageUrl, newsUrl,publishedAt }=this.props;
    return (
      <div className="my-3">
        <div className="card">
        <img src={imageUrl?imageUrl:"https://as2.ftcdn.net/v2/jpg/02/50/35/31/1000_F_250353164_nsaIe1znGNR7hfVbwgAT1P0Y6AEdg9GJ.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="card-footer">
      <small className="text-muted">{publishedAt}</small>
    </div>
          <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
