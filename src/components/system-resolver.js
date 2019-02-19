
export default class SystemResolver {
  constructor(data) {
    this.systems = data.systems.map((system, i) => {system.index = i; return system}); 
    this.paths = this.systems.map(system => system.path); 
    
    this.curIndex = 0; 
    this.curSystem = this.systems[0]; 
    this.curPath = this.systems[0].path; 
  }

  setCurPath(path) {
    for(let i = 0; i < this.paths.length; i++) {
      if(this.paths[i] === path) {
        this.curIndex = i; 
        this.curSystem = this.systems[i]; 
        this.curPath = path;
        return true; 
      }
    }
    throw new Error("System path does not exist")
  }

  get prevSystem() {
    let prevIndex = this.curIndex == 0 ? this.systems.length - 1 : this.curIndex - 1; 
    return this.systems[prevIndex]; 
  }

  get nextSystem() {
    let nextIndex = this.curIndex == this.systems.length - 1 ? 0 : this.curIndex + 1; 
    return this.systems[nextIndex]; 
  }
}
