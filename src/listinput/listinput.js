import React from "react";
import "./listinput.css";

export default class ListInput extends React.Component {
    constructor(props) {
        super(props);
        this.runSubmitItem = this.runSubmitItem.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
        this.runRemoveItem = this.runRemoveItem.bind(this);
        this.state = {
            item: "",
            userList: "",
            someStyle: { textDecorationLine: "none" },
            someStyleCheck: false
        }
    }

    runSubmitItem() {
        if (this.state.item === "") {
            alert(`Entry can't be blank`)
        } else {
            var lowerCaseItem = this.state.item.toLowerCase();
            this.props.submitItem(lowerCaseItem).then((result) => {
                this.setState({
                    item: "",
                    userList: result.data.item[0].items.map((items, index) => {
                        var upperCaseItem = items.charAt(0).toUpperCase() + items.slice(1);
                        var somelist = <div>
                            <li>{upperCaseItem}</li>
                        </div>
                        return somelist
                    })
                })
            })
        }
    }

    runRemoveItem() {
        var lowerCaseItem = this.state.item.toLowerCase();
        this.props.removeItem(lowerCaseItem).then((result) => {
            console.log(result.data.message)
            this.setState({
                item: "",
                userList: result.data.item[0].items.map((items, index) => {
                    var upperCaseItem = items.charAt(0).toUpperCase() + items.slice(1);
                    var someotherlist = <div>
                        <li>{upperCaseItem}</li>
                    </div>
                    return someotherlist
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
                <input type="text" placeholder="enter item to add/remove" value={this.state.item} onChange={this.onItemChange} />
                <button onClick={this.runSubmitItem}>Add Item</button> <button onClick={this.runRemoveItem}>Remove item</button>
                <p>Your current list:</p>
                <p>{this.state.userList}</p>
            </div>
        )
    }
}
