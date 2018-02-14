import { playMode } from './../../config/index'

export default {
    namespaced: true,
    state: {
        // 歌手信息
        singer: {},
        // 是否在播放
        playing: {},
        // 是否全屏播放
        fullScreen: false,
        // 播放列表
        playlist: [],
        // 顺序列表
        sequenlist: [],
        // 播放顺序
        mode: playMode.sequence,
        // 当前播放歌曲的索引
        currentIndex: 0
    },
    getters: {
        currentSong (state) {
            return state.playlist[state.currentIndex]
        }
    },
    mutations: {
        SET_SINGER (state, singer) {
            state.singer = singer
        },
        SET_PLAYING (state, flag) {
            state.playing = flag
        },
        SET_FULL_SCREEN (state, flag) {
            state.fullScreen = flag
        },
        SER_PLAY_LIST (state, list) {
            state.playlist = list
        },
        SET_SEQUEN_LIST (state, list) {
            state.sequenlist = list
        },
        SET_MODE (state, mode) {
            state.mode = mode
        },
        SET_CURRENT_INDEX (state, index) {
            state.currentIndex = index
        }
    },
    actions: {
        playSongList ({ commit, state }, {index, song, list}) {
            commit('SET_PLAYING', true)
            commit('SET_FULL_SCREEN', true)
            commit('SER_PLAY_LIST', list)
            commit('SET_SEQUEN_LIST', list)
            commit('SET_CURRENT_INDEX', index)
            console.log(song)
        },

        setFullScreen ({ commit }, flag) {
            commit('SET_FULL_SCREEN', flag)
        },

        setPlaying ({ commit }, flag) {
            commit('SET_PLAYING', flag)
        },

        setCurrentIndex ({ commit }, index) {
            commit('SET_CURRENT_INDEX', index)
        }
    }
}