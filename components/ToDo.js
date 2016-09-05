import React, {Component} from 'react';
import {Node,Tree} from './Tree'


export default class ToDo extends Component {
  constructor(props){
      super(props);

      this.state = {
        newTask : '',
        newParent: '',
        action: '',
        message: '',
        delTask: '',
        promote: '',
        assign: '',
        assignTarget: false,
        assignParent:'',
        addForm: false,
        tree: new Tree('')
    }
      this.onTaskChange=this.onTaskChange.bind(this)
      this.onParentChange=this.onParentChange.bind(this)
      this.onPromoChange=this.onPromoChange.bind(this)
      this.onAssignParentChange=this.onAssignParentChange.bind(this)
      this.onAssignChange=this.onAssignChange.bind(this)
      this.onAddSubmit = this.onAddSubmit.bind(this)
      this.onPromoButtonSubmit = this.onPromoButtonSubmit.bind(this)
      this.onAssignTargetSubmit = this.onAssignTargetSubmit.bind(this)
      this.onAssignDestSubmit = this.onAssignDestSubmit.bind(this)
      this.renderPromoteButton = this.renderPromoteButton.bind(this)
      this.renderAssignTask = this.renderAssignTask.bind(this)
      this.renderAddTask = this.renderAddTask.bind(this)
      this.renderAddSubTask = this.renderAddSubTask.bind(this)
      this.renderTree = this.renderTree.bind(this)
      this.renderOptionButtons = this.renderOptionButtons.bind(this)
      this.renderAction = this.renderAction.bind(this)
      this.renderAddButton = this.renderAddButton.bind(this)
      this.onAddButtonSubmit = this.onAddButtonSubmit.bind(this)
      this.renderNode = this.renderNode.bind(this)
      this.onDelButtonSubmit = this.onDelButtonSubmit.bind(this)
      this.renderDelButton = this.renderDelButton.bind(this)
    }

onTaskChange(event){
       this.setState( {newTask: event.target.value} )
    }

onParentChange(event){
      this.setState( {newParent: event.target.value} )
    }

onPromoChange(event){
  this.setState({promote: event.target.value})
}

onAssignChange(event){
  this.setState({assign: event.target.value})
}

onAssignParentChange(event){
  this.setState({assignParent: event.target.value})
}

onAddSubmit(event){
       event.preventDefault();
       this.state.tree.add(this.state.newTask,this.state.newParent,this.state.tree.traverse)
       this.setState({
         newTask : '',
         newParent: '',
         action:'',
      })
      if(this.state.form_val){
        var form_val = false
        this.setState({addForm: form_val})
      }
     }

onPromoButtonSubmit(task){
  var tree = this.state.tree
  var term = task
  var target;
  tree.contains(function(node){
    if (node.data === term) {
        target =(node);
    }
  },tree.traverse);
  var newParent = target.parent.parent.data
  tree.addBranch(target,newParent,tree.traverse)
  tree.remove(target.data,target.parent.data,tree.traverse)
  this.setState({
    tree: tree,
    promote: '',
  })
}

onAssignTargetSubmit(event){
  event.preventDefault();
  var tree = this.state.tree
  var term = this.state.assign

  this.setState({
    assignTarget: true,})
}

onAssignDestSubmit(event){
  event.preventDefault();
  var target = this.state.assignTarget;
  var tree = this.state.tree
  var term = this.state.assign
  var destination = this.state.assignParent
  var target;
  tree.contains(function(node){
    if (node.data === term) {
        target =(node);
    }
  },tree.traverse);

  var newParent;
  tree.contains(function(node){
    if (node.data === destination ) {
        newParent =(node);
    }
  },tree.traverse);
  tree.addBranch(target,newParent.data,tree.traverse)
  tree.remove(target.data,target.parent.data,tree.traverse)
  this.setState({
    tree: tree,
    assignTarget: false,
    assign: '',
    assignParent: ''
  })
}

onAddButtonSubmit(parent){
       this.setState( {newParent:parent} )
       var form_val = true
       this.setState({
         addForm: form_val,
         newParent:parent,
         action: 'hide'
       })
     }

onDelButtonSubmit(task){
  var tree = this.state.tree
  var term = task
  var parent;
  tree.contains(function(node){
    if (node.data === term) {
        parent =(node.parent);
    }
  },tree.traverse);
  tree.remove(term,parent.data,tree.traverse)
  this.setState({
    tree: tree,
    action: '',
  })
  }

renderAddSubTask(){
  return(
    <form onSubmit = {this.onAddSubmit} className='input_field'>
      <input
         placeholder = "What needs to be done?"
         value = {this.state.newTask}
         onChange = {this.onTaskChange}
         className = 'styled_input'/>

    </form>
    )
    }

renderAddButton(parent){
  if(this.state.addForm && this.state.newParent === parent){
    return [
    <div key='blue_pluss' onClick ={()=>this.onAddButtonSubmit(parent)} className = "task_icon_blue">
      <span className="glyphicon glyphicon-plus"></span>
    </div>,<div key='text_box'className='subAdd'>{this.renderAddSubTask()}</div>
  ]
  }
  else{return(
      <div onClick ={()=>this.onAddButtonSubmit(parent)} className = "task_icon">
        <span className="glyphicon glyphicon-plus"></span>
      </div>
    )}

}

renderDelButton(node){

  return(
    <div onClick ={()=>this.onDelButtonSubmit(node)} className = "task_icon">
      <span className="glyphicon glyphicon-remove"></span>
    </div>
    )

}

renderAddTask(){
  return(
    <form onSubmit = {this.onAddSubmit} className='input_field_top'>
      <input
         placeholder = "What needs to be done?"
         value = {this.state.newTask}
         onChange = {this.onTaskChange}
         className = 'home_input'/>

    </form>
    )
  }

renderPromoteButton(node){
  if(node.parent.data != ''){
  return(
    <div onClick ={()=>this.onPromoButtonSubmit(node.data)} className = "task_icon">
      <span className="glyphicon glyphicon-arrow-up"></span>
    </div>
  )}
  else{
    return
  }
}

renderAssignTask(){
  if(this.state.assignTarget){
    return(<div> <b>{this.state.assign}</b> will be moved </div>)
  }
  else{
  return(
    <form onSubmit = {this.onAssignTargetSubmit} className='input_field_top'>
      <input
         placeholder = "What is moving?"
         value = {this.state.assign}
         onChange = {this.onAssignChange}
         className = 'home_input'/>
    </form>
  )}
}

renderAssignDest(){
  if(this.state.assignTarget){
  return(<form onSubmit = {this.onAssignDestSubmit} className='input_field_top'>
  <input
     placeholder = "Where is it going?"
     value = {this.state.assignParent}
     onChange = {this.onAssignParentChange}
     className = 'home_input'/>
  </form>)}
  else{
    return
  }
}

renderNode(node){

    if(node.data === '' ){ return node.children.map(this.renderNode)}
    else  if(node.children.length != 0 && node.data != ''){
        return <li key = {node.data} > {node.data} {this.renderPromoteButton(node)} {this.renderDelButton(node.data)} {this.renderAddButton(node.data)}  <ul className = "kids">{node.children.map(this.renderNode)}</ul></li>
      }
      else{
        return <li key = {node.data}> {node.data} {this.renderPromoteButton(node)} {this.renderDelButton(node.data)} {this.renderAddButton(node.data)} </li>
      }
    }

renderTree(tree){
  var data = []
  var base = tree._root
  return <div className='todo_list'>{this.renderNode(base)}</div>
}

renderOptionButtons(){
    return([<button type="button" className="header_button" key = {'Add Task'} onClick= {()=>this.setState({action: 'Add Task'})}>Add Task</button>,
          <button type="button" className="header_button pull-right" key = {'Move a Task'} onClick= {()=>this.setState({action: 'Move a Task'})}>Re-assign a Task</button>])

}

renderAction(){
  switch (this.state.action) {
    case 'Add Task':
      return <div className ='action'>{this.renderAddTask()}</div>
    case 'Move a Task':
        return <div className ='action'>{this.renderAssignTask()}{this.renderAssignDest()}</div>
    case 'hide':
            return <div className ='action'>Adding sub task</div>
    default:
        return <div className ='action'> </div>
  }
}

  render() {
    return (
      <div className='ToDo'>
        <h1> React Tree To Do </h1>
        <div className='header'>
          {this.renderOptionButtons()}
        </div>
        {this.renderAction()}
      <div className='todo_list'>
        <h1> My To Do List </h1>
        <div className = "line"></div>
        <ul>{this.renderTree(this.state.tree)}</ul>
      </div>

      </div>
    )
  }
}
