var problems = [
    {
        id: 1,
        name: 'Two Sum',
        desc: `Given an array of integers, return indices of the two numbers such that they add up to a specific target.
    \nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
        difficulty: 'Easy'
    },
    {
        id: 2,
        name: 'Add Two Numbers',
        desc: `You are given two linked lists representing two non-negative integers. Add the two numbers and return it as a linked list.`,
        difficulty: 'Medium'
    },
    {
        id: 3,
        name: 'Longest Substring Without Repeating Characters',
        desc: `Given a string, find the length of the longest substring without repeating characters.`,
        difficulty: 'Medium'
    },
    {
        id: 4,
        name: 'Median of Two Sorted Arrays',
        desc: `There are two sorted arrays nums1 and nums2 of size m and n respectively.\nFind the median of the two sorted arrays.`,
        difficulty: 'Hard'
    },
    {
        id: 5,
        name: 'Longest Palindromic Substring',
        desc: `Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.`,
        difficulty: 'Super'
    }
];

var ProblemModel = require("../models/ProblemModels");

var getProblems = function () {
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function (err, problems) {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        })
    });
}

var getProblem = function (id) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({ id: id }, function (err, problem) {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        })
    })
}

var addProblem = function (newProblem) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({ name: newProblem.name }, function (err, problem) {
            if (problem) {
                reject("Problem name already exists");
            } else {
                ProblemModel.count({}, function (err, num) {
                    newProblem.id = num + 1;
                    var mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(newProblem);
                });
            }
        });
    })
}

module.exports = {
    getProblems: getProblems,
    getProblem: getProblem,
    addProblem: addProblem
}