# Effector

Effector is a small JavaScript library for testing asynchronous functions. It was inspired by [Redux-Saga](https://redux-saga.js.org/) and its effects model. In the project I was working on, a saga was overkill for what should have been a simple async function. I also thought testing the generator function was not as intuitive as it should be. Effector tries to make testing asynchronous functions simple and understandable.

## Installing

Install Effector into your project with your favorite javascript package manager:

```
npm install --save-dev effector
```

## Usage

In the function you want to test, wrap your asynchronous calls with Effector's `call` method. Let's say we've got an api for ordering food. A method that looks like this:

```javascript
import {fetchMenu, orderFood} from 'restaurant'

async function quicklyOrder () {
  const menu = await fetchMenu()
  const deliveryTime = await orderFood(menu[0])
  return deliveryTime
}
```

would look like this using Effector's call method:

```javascript
import {fetchMenu, orderFood} from 'restaurant'
import {call} from 'effector'

async function quicklyOrder () {
  const menu = await call(fetchMenu)
  const deliveryTime = await call(orderFood, menu[0])
  return deliveryTime
}
```

Doing this allows you to easily test the `quicklyOrder` method in a testing framework like [Jest](https://facebook.github.io/jest/):

```javascript
import {fetchMenu, orderFood} from 'restaurant'
import {quicklyOrder} from 'my-food-app'
import {mockCall, useMockCalls, resetMockCalls} from 'effector/lib/test'

// Setup mock calling
useMockCalls()

// make sure to clean up mock calls after every test
afterEach(() => {
  resetMockCalls()
})

it('orders the first thing on the menu', async () => {
  mockCall(fetchMenu, ['chicken', 'beef', 'pork'])
  const mockOrderFood = mockCall(orderFood, jest.fn(() => '30 minutes')
  const deliveryTime = await quicklyOrder()
  expect(mockOrderFood).toHaveBeenCalledWith('chicken')
  expect(deliveryTime).toBe('30 minutes')
})
```
