Portfolio Manager Mobile Web App

Technologies used: React js, Chart.js

Application info:
The purpose of this application is to help user track their portfolio performance, customize the weight of each stock in their portfolio, and shows monthly amount of share that can be purchase to achieve that weighting.
This apps is currently optimized only for mobile phone screen size.

Code Structure:

- StateContainer
  - Manage
    - Form
    - InputCard
      - Card
  - Overview
    - Chart
    - Portfolio
      - PortfolioCard
  - Recommendation
    - Budget
    - Buying
      - BuyingCard

Application Feature :

- Manage tab =>
  Add new stock as owned using form on the top(input : symbol, position, cost basis, target % in portfolio).
  Shows list of stocks that has been added by users, able to update the stock list, or remove a stock from the list.
- Overview tab =>
  Shows doughnut chart of the percentage of each stock owned, and at center shows overall value and gains/losses.
  Shows list of owned stock with details individual value, gains/losses
- Buying tab =>
  User able to input allocated cash for next purchase
  A list of suggested share quantity is generated based on target % that user has set in Manage tab. Clicking "Made the purchase" button will automatically update the positions of stocks.

Codes Feature:

- StateContainer
  State 'holdings' => contains array of key-value pairs, each key value pairs is representing stock owned by user. It stores basic info (name, logo, symbols, price, color in chart), user input (position, cost, targetPct), and a set of calculated values (value, unrealizedGain, unrealizedGainPct)

  Key function:
  fetchInfo => fetch two URL from Finnhub API, update all information in const stockInfo, and finally update state 'holdings'
  generateNextStockInfo => update value, unrealizedGain, unrealizedGainPct based on new position and cost (used in Recommended.js when user made purchase as per suggested)
  useEffect on state 'Temp' => run re-fetch using setInterval

- Manage
  State 'newHolding'=> capture user input from Form
  useEffect on state 'newHolding' => run fetchInfo function on input stock

- Overview
  const totalValue and stockWeight are calculated based on parent 'holdings'
  Chart.js doughnut is modified to follow coloring of holdings.color.

- Recommended
  State 'userBudget' => contains user input value .
  const totalValue and totalDeltaPct are calculated based on parent 'holdings'
  create array of object 'holdingDelta', which tracks each stock deltaPct (target % of portfolio - current % of portfolio), and set isBuyingCandidate is true if deltaPct > 0.1%

  in Buying.js, new array of objects 'newBuyingList' contain element that holdingDelta.isBuyingCandidate == true, and add buyQty parameter based on holdingDelta.deltaPct and 'userBudget'.
  'newBuyingList' is map to display, if user click on "I've made the purchase" button => run generateNextStockInfo to generate updated position, cost, value, and gains number, and update 'holdings'.
