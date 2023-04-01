const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
// Getting all
router.get('/', async (req, res)=> {
 try{
    const recipes = await Recipe.find()
    res.json(recipes)
 } catch (err){
    res.status(500).json({ message: err.message })
 }
})
// Getting one
router.get('/:id', getRecipe,(req, res)=> { //notice getRecipe middleware.
 res.json(res.recipe)
})
// Creating one
router.post('/', async (req, res)=> {
    const recipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        url: req.body.url,
        image: req.body.image,
        prepTime: req.body.prepTime,
        description:req.body.description,
        dessert:req.body.dessert,
        breakfast:req.body.breakfast,
        lunch:req.body.lunch,
        dinner:req.body.dinner,
    })
    try {
        const newRecipe = await recipe.save()
        res.status(201).json(newRecipe)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// Updating one
router.patch('/:id', getRecipe, async(req, res)=> {
    if (req.body.name != null) {
        res.recipe.name = req.body.name
    }
    if (req.body.ingredients != null) {
        res.recipe.ingredients = req.body.ingredients
    }
    if (req.body.prepTime != null) {
        res.recipe.prepTime = req.body.prepTime
    }
    if (req.body.description != null) {
        res.recipe.description = req.body.description
    }
    if (req.body.dessert != null) {
        res.recipe.dessert = req.body.dessert
    }
    if (req.body.breakfast != null) {
        res.recipe.breakfast = req.body.breakfast
    }
    if (req.body.lunch != null) {
        res.recipe.lunch = req.body.lunch
    }
    if (req.body.dinner != null) {
        res.recipe.dinner = req.body.dinner
    }
    try {
        const updatedRecipe = await res.recipe.save()
        res.json(updatedRecipe)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
// Deleting one
router.delete('/:id', getRecipe,async (req, res)=> {
    try {
        await res.recipe.remove()
        res.json({message: 'Deleted Recipe'})
    } catch {
        res.status(500).json({message: err.message })
    }
})

async function getRecipe(req, res, next) { //this is what is known as middleware, go to the router for getting one for where it is used
    let recipe;
 try {
    recipe = await Recipe.findById(req.params.id)
    if (recipe == null) {
        return res.status(404).json({ message: 'Cannot find recipe'})
    }
 } catch(err) {
    return res.status(500).json({ message: err.message })
 }
 res.recipe = recipe
 next()
}

module.exports = router