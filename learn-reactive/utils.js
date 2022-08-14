let activeEffect = null
const targetMap = new WeakMap();


function effect(fn) {
  activeEffect = fn;
  activeEffect()
  activeEffect = null // 执行后立马变成null
}

function track(target, key) {
  // 如果此时activeEffect为null则不执行下面
  if (!activeEffect) {
    return
  }

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }

  dep.add(activeEffect) // 把此时的activeEffect添加进去
}

function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (depsMap) {
    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach((effect) => effect());
    }
  }
}

module.exports.effect = effect;
module.exports.track = track;
module.exports.trigger = trigger;