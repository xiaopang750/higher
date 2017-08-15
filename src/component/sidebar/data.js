const movie = [
  {name: '热播电影', href: '/c/movie/hot'},
  {name: '最新更新', href: '/c/movie/pubtime'},
  {name: '欧美大片', href: '/c/movie/hot', qs: {area: '欧美大片'}},
  // {name: '亿元票房', href: '/c/movie/billion_ticket_num'},
  {name: '最受好评', href: '/c/movie/rating'},
  // {name: '电影专题', href: '/c/movie/topic'},
  {name: '内地精选', href: '/c/movie/hot', qs: {area: '内地'}},
  {name: '动画电影', href: '/c/movie/hot', qs: {type: '动画'}},
  {name: '日韩电影', href: '/c/movie/hot', qs: {area: '日韩电影'}},
  {name: '动作大片', href: '/c/movie/hot', qs: {type: '动作'}},
  {name: '港台电影', href: '/c/movie/hot', qs: {area: '港台电影'}},
  {name: '恐怖惊悚', href: '/c/movie/hot', qs: {type: '恐怖惊悚'}},
  {name: '爱情伦理', href: '/c/movie/hot', qs: {type: '爱情'}},
  {name: '喜剧精选', href: '/c/movie/hot', qs: {type: '喜剧'}}
];

const tv = [
  {name: '热播剧集', href: '/c/tv/hot'},
  {name: '最近更新', href: '/c/tv/pubtime'},
  {name: '美剧同步', href: '/c/tv/pubtime', qs: {area: '美国'}},
  {name: '内地强档', href: '/c/tv/pubtime', qs: {area: '内地'}},
  {name: '大热韩剧', href: '/c/tv/pubtime', qs: {area: '韩国'}},
  {name: '香港TVB', href: '/c/tv/pubtime', qs: {area: '中国香港'}},
  {name: '日剧热播', href: '/c/tv/pubtime', qs: {area: '日本'}}
];

const zongyi = [
  {name: '热播综艺', href: '/c/zongyi/hot'},
  {name: '最近更新', href: '/c/zongyi/pubtime'},
  {name: '内地精选', href: '/c/zongyi/hot', qs: {area: '内地'}},
  {name: '日韩热播', href: '/c/zongyi/hot', qs: {area: '日韩'}},
  {name: '真人秀场', href: '/c/zongyi/hot', qs: {type: '选秀'}},
  {name: '港台集锦', href: '/c/zongyi/hot', qs: {area: '港台'}},
  {name: '情感相亲', href: '/c/zongyi/hot', qs: {type: '情感'}},
  {name: '欧美热门', href: '/c/zongyi/hot', qs: {area: '欧美'}},
  {name: '关注生活', href: '/c/zongyi/hot', qs: {type: '生活'}},
  {name: '晚会曲艺', href: '/c/zongyi/hot', qs: {type: '曲艺'}}
];

const comic = [
  {name: '热播动漫', href: '/c/comic/hot'},
  {name: '最近更新', href: '/c/comic/pubtime'},
  {name: '日本热播', href: '/c/comic/pubtime', qs: {area: '日本'}},
  {name: '国产精选', href: '/c/comic/pubtime', qs: {area: '国产'}},
  {name: '机甲战斗', href: '/c/comic/pubtime', qs: {type: '机甲'}},
  {name: '热血冒险', href: '/c/comic/pubtime', qs: {type: '热血冒险'}},
  {name: '欧美推荐', href: '/c/comic/pubtime', qs: {area: '欧美'}},
  {name: '轻松搞笑', href: '/c/comic/pubtime', qs: {type: '搞笑'}},
  {name: '亲子益智', href: '/c/comic/pubtime', qs: {type: '亲子益智'}},
  {name: '萝莉治愈', href: '/c/comic/pubtime', qs: {type: '萝莉治愈'}},
  {name: '青春校园', href: '/c/comic/pubtime', qs: {type: '校园'}}
];

const jilupian = [
  {name: '最近更新', href: '/c/jilupian/pubtime'},
  {name: '探索发现', href: '/c/jilupian/hot', qs: {type: '探索'}},
  {name: '历史风云', href: '/c/jilupian/hot', qs: {type: '历史'}},
  {name: '人物揭秘', href: '/c/jilupian/hot', qs: {type: '人物'}},
  {name: '热播记录', href: '/c/jilupian/hot'},
  {name: '军事解码', href: '/c/jilupian/hot', qs: {type: '军事'}},
  {name: '文化风情', href: '/c/jilupian/hot', qs: {type: '文化'}},
  {name: '社会人文', href: '/c/jilupian/hot', qs: {type: '社会'}},
  {name: '旅游行者', href: '/c/jilupian/hot', qs: {type: '旅游'}}
];

export {
  movie,
  tv,
  zongyi,
  comic,
  jilupian
};
