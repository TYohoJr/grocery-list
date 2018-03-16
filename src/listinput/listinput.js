import React from "react";
import axios from "axios";

export default class ListInput extends React.Component {
    constructor(props) {
        super(props);
        this.runSubmitItem = this.runSubmitItem.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
        this.runRemoveItem = this.runRemoveItem.bind(this);
        this.state = {
            item: "",
            userList: ""
        }
    }

    runSubmitItem() {
        this.props.submitItem(this.state.item).then((result) => {
            console.log(result)
            this.setState({
                item: "",
                userList: result.data.item[0].items.map((items, index) => {
                    var list = <li>{items[index]}</li>
                    return list
                })
            })
        })
    }

    runRemoveItem() {
        this.props.removeItem(this.state.item).then((result) => {
            this.setState({
                item: "",
                userList: result.data.item[0].items.map((items, index) => {
                    var list = <li>{items}</li>
                    return list
                })
            })
        })
    }

    onItemChange = (e) => {
        this.setState({
            item: (e.target.value)
        });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="enter item" value={this.state.item} onChange={this.onItemChange} />
                <button onClick={this.runSubmitItem}>Submit Item</button>
                <p>Your current list:</p>
                <p>{this.userList}</p>
                <button onClick={this.runRemoveItem}>remove item</button>
            </div>
        )
    }
}