'use strict';
 
angular.module('myApp').controller('PostController', ['$scope', 'PostService', function($scope, PostService) {
    var self = this;
    self.post={id:null, name:'', message:''};
    self.posts=[];
 
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
 
 
    fetchAllPosts();
 
    function fetchAllPosts(){
        PostService.fetchAllPosts()
            .then(
            function(d) {
                self.posts = d;
            },
            function(errResponse){
                console.error('Error while fetching Posts');
            }
        );
    }
 
    function createPost(post){
        PostService.createPost(post)
            .then(
            fetchAllPosts,
            function(errResponse){
                console.error('Error while creating Post');
            }
        );
    }
 
    function updatePost(post, id){
        PostService.updatePost(post, id)
            .then(
            fetchAllPosts,
            function(errResponse){
                console.error('Error while updating Posts');
            }
        );
    }
 
    function deletePost(id){
        PostService.deleteUser(id)
            .then(
            fetchAllPosts,
            function(errResponse){
                console.error('Error while deleting Post');
            }
        );
    }
 
    function submit() {
        if(self.post.id===null){
            console.log('Saving new post ', self.post);
            createPost(self.post);
        }else{
            updatePost(self.post, self.post.id);
            console.log('Post updated with id ', self.user.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited' , id);
        for(var i = 0; i < self.posts.length; i++){
            if(self.posts[i].id === id) {
                self.post = angular.copy(self.posts[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.post.id === id) { //clean form if the user to be deleted is shown there.
            reset();
        }
        deletePost(id);
    }
 
 
    function reset(){
        self.post={id:null, name:'', message:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);