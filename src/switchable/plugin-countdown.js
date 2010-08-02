/**
 * Switchable Countdown Plugin
 * @creator  gonghao<gonghao@ghsky.com>
 */
KISSY.add('switchable-countdown', function(S, undefined) {

    var DOM = S.DOM, Event = S.Event, Anim = S.Anim,
        Switchable = S.Switchable,
        CLS_PREFIX = 'ks-switchable-trigger-',
        TRIGGER_MASK_CLS = CLS_PREFIX + 'mask',
        TRIGGER_CONTENT_CLS = CLS_PREFIX + 'content';

    /**
     * 添加默认配置
     */
    S.mix(Switchable.Config, {
        countdown: false,
        countdownStyle: 'width: 0' // 初始样式由用户在 css 里指定，配置里仅需要传入有变化的最终样式
    });

    /**
     * 添加插件
     */
    Switchable.Plugins.push({

        name: 'countdown',

        init: function(host) {
            var cfg = host.config, interval = cfg.interval,
                triggers = host.triggers, masks = [], style = cfg.countdownStyle,
                anim;

            // 必须保证开启 autoplay 以及有 trigger 时，才能开启倒计时动画
            if (!cfg.autoplay || !cfg.hasTriggers || !cfg.countdown) return;

            // 为每个 trigger 增加倒计时动画覆盖层
            S.each(triggers, function(trigger, i) {
                trigger.innerHTML = '<div class="' + TRIGGER_MASK_CLS + '"></div>' +
                    '<div class="' + TRIGGER_CONTENT_CLS + '">' + trigger.innerHTML + '</div>';
                masks[i] = trigger.firstChild;
            });

            // 鼠标悬停，停止自动播放
            if (cfg.pauseOnHover) {
                Event.on(host.container, 'mouseenter', function() {
                    // 先停止未完成动画
                    stopAnim();

                    // 快速平滑关闭当前未完成动画效果
                    anim = new Anim(masks[host.activeIndex], style, interval / 10, 'easeOut').run();
                });
            }

            // panels 切换前，当前 trigger 完成善后工作以及下一 trigger 进行初始化
            host.on('beforeSwitch', function(ev) {
                // 恢复前，先结束未完成动画效果
                stopAnim();

                // 将当前 mask 恢复动画前状态
                DOM.removeAttr(masks[host.activeIndex], 'style');

                // 悬停状态时，不需要触发倒计时动画
                if (host.paused) {
                    // 将下一个 mask 隐藏，也就是没有动画效果
                    DOM.css(masks[ev.toIndex], 'visibility', 'hidden');
                }
            });

            // panel 切换完成时，开始 trigger 的倒计时动画
            host.on('switch', function(ev) {
                // 悬停状态，当用户主动触发切换时，不需要倒计时动画
                if (!host.paused) {
                    startAnim(ev.currentIndex);
                }
            });

            // 开始第一次
            startAnim(host.activeIndex);

            // 开始倒计时动画
            function startAnim(index) {
                stopAnim(); // 开始之前，先确保停止掉之前的
                anim = new Anim(masks[index], style, interval - 1).run(); // -1 是为了动画结束时停留一下，使得动画更自然
            }

            // 停止所有动画
            function stopAnim() {
                if (anim) {
                    anim.stop();
                    anim = undefined;
                }
            }
        }
    });
});
