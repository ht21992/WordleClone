from django.shortcuts import render


def wordle_game_view(request):
    return render(request, 'wordle/wordle.html', context={'title': 'Wordle'})
