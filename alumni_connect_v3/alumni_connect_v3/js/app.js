// App shared helpers (localStorage-based)
(function(){
  window.App = {
    get: function(key){ 
      try{ 
        return JSON.parse(localStorage.getItem(key))||[] 
      }catch(e){ 
        return [] 
      } 
    },
    
    set: function(key,val){ 
      localStorage.setItem(key, JSON.stringify(val)) 
    },
    
    saveUser: function(user){
      const users = this.get('users');
      const idx = users.findIndex(u=>u.email===user.email);
      if(idx>=0) users[idx]=user; 
      else users.push(user);
      this.set('users',users);
    },
    
    findUserByEmail: function(email){
      return this.get('users').find(u=>u.email===email);
    },
    
    login: function(email,password){
      const u = this.findUserByEmail(email);
      if(u && u.password===password){
        localStorage.setItem('currentUser', JSON.stringify(u));
        return true;
      }
      return false;
    },
    
    logout: function(){
      localStorage.removeItem('currentUser');
    },
    
    currentUser: function(){ 
      try{
        return JSON.parse(localStorage.getItem('currentUser'))
      }catch(e){
        return null
      } 
    },
    
    addJob: function(job){ 
      const jobs = this.get('jobs'); 
      jobs.unshift(job); 
      this.set('jobs', jobs); 
    },
    
    addEvent: function(ev){ 
      const events = this.get('events'); 
      events.unshift(ev); 
      this.set('events', events); 
    },
    
    addMessage: function(msg){ 
      const msgs = this.get('messages'); 
      msgs.push(msg); 
      this.set('messages', msgs); 
    },
    
    // connections: stored as object { userEmail: [connectedEmails] }
    getConnections: function(){ 
      try{ 
        return JSON.parse(localStorage.getItem('connections'))||{} 
      }catch(e){
        return {}
      } 
    },
    
    addConnection: function(a,b){
      const cs = this.getConnections();
      if(!cs[a]) cs[a]=[];
      if(!cs[a].includes(b)) cs[a].push(b);
      if(!cs[b]) cs[b]=[];
      if(!cs[b].includes(a)) cs[b].push(a);
      localStorage.setItem('connections', JSON.stringify(cs));
    },
    
    // Enhanced user data helper
    enhanceUserData: function() {
      const users = this.get('users');
      return users.map(user => {
        // Add profession based on skills or company
        let profession = 'other';
        const skills = (user.skills || []).map(s => s.toLowerCase());
        const company = (user.company || '').toLowerCase();
        
        if (skills.some(s => ['software', 'developer', 'programming', 'web', 'tech', 'coding'].includes(s)) || 
            company.includes('tech') || company.includes('software')) {
          profession = 'technology';
        } else if (skills.some(s => ['business', 'management', 'marketing', 'sales', 'entrepreneur'].includes(s)) || 
                  company.includes('business') || company.includes('consult') || company.includes('corp')) {
          profession = 'business';
        } else if (skills.some(s => ['medical', 'health', 'care', 'nursing', 'doctor', 'hospital'].includes(s)) || 
                  company.includes('hospital') || company.includes('health') || company.includes('medical')) {
          profession = 'healthcare';
        } else if (skills.some(s => ['teaching', 'education', 'professor', 'academic', 'university'].includes(s)) || 
                  company.includes('university') || company.includes('college') || company.includes('school')) {
          profession = 'education';
        } else if (skills.some(s => ['engineer', 'mechanical', 'electrical', 'civil', 'construction'].includes(s)) || 
                  company.includes('engineering')) {
          profession = 'engineering';
        } else if (skills.some(s => ['finance', 'accounting', 'banking', 'investment', 'financial'].includes(s)) || 
                  company.includes('bank') || company.includes('financial') || company.includes('capital')) {
          profession = 'finance';
        } else if (skills.some(s => ['design', 'art', 'creative', 'music', 'writing', 'graphic'].includes(s))) {
          profession = 'creative';
        } else if (skills.some(s => ['research', 'scientist', 'phd', 'lab', 'development'].includes(s))) {
          profession = 'research';
        }
        
        return {
          ...user,
          profession: profession
        };
      });
    }
  };

  // seed demo users if none
  if(!localStorage.getItem('users')){
    const demo = [
      {
        name: 'Platform Administrator', 
        email: 'admin@alumni.com', 
        password: 'admin123', 
        role: 'alumni', 
        company: 'AlumniConnect Platform', 
        skills: ['Administration', 'Mentorship', 'Leadership']
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        password: 'demo123',
        role: 'alumni',
        company: 'Tech Solutions Inc.',
        skills: ['Software Development', 'Project Management', 'JavaScript']
      },
      {
        name: 'Michael Chen',
        email: 'michael.c@example.com',
        password: 'demo123',
        role: 'alumni',
        company: 'Innovate Labs',
        skills: ['Data Science', 'Machine Learning', 'Python']
      },
      {
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        password: 'demo123',
        role: 'student',
        company: 'State University',
        skills: ['Web Development', 'UI/UX Design', 'React']
      },
      {
        name: 'Dr. Robert Wilson',
        email: 'robert.w@example.com',
        password: 'demo123',
        role: 'faculty',
        company: 'University College',
        skills: ['Research', 'Teaching', 'Computer Science']
      },
      {
        name: 'Lisa Martinez',
        email: 'lisa.m@example.com',
        password: 'demo123',
        role: 'professional',
        company: 'Global Finance Corp',
        skills: ['Finance', 'Investment', 'Analysis']
      }
    ];
    localStorage.setItem('users', JSON.stringify(demo));
  }
  
  // ensure arrays exist
  ['jobs','events','messages','connections'].forEach(k=>{ 
    if(!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify([])); 
  });
})();