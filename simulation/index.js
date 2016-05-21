var stoch = require('stochastic');
//console.log(stoch);

//var brownianMotion = stoch.brown(4, 2, 2, 100, true);
//console.log(brownianMotion);
var exp = stoch.exp(1);
console.log(exp);

/*
var brownianMotion = stoch.brown(mu, sigma, T, steps, path);

var geometricBrownianMotion = stoch.GBM(S0, mu, sigma, T, steps, path);

var discreteMarkovChain = stoch.DTMC(transMatrix, steps, start, path);

var continuousMarkovChain = stoch.CTMC(transMatrix, T, start, path);

var poissonProcess = stoch.poissP(lambda, T, path);

var sample = stoch.sample(array, num);

var histogram = stoch.hist(array);

var exp = stoch.exp(lambda);

var pareto = stoch.pareto(x_m,alpha);*/
